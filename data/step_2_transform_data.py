from lxml.etree import parse, tounicode
from glob import glob
import json
from collections import defaultdict
import re

# Which semester are we in right now?
CURRENT_SEMESTER = "B202"

STUDY_PLAN_FILES = glob("plan*.xml")
print("Celkem studijnich planu v BK: " + str(len(STUDY_PLAN_FILES)))

# Some simple utils

def maybe_text(node, xpath):
    nodes = node.xpath(xpath+"/text()")
    return nodes[0] if len(nodes)>0 else ""

ALPHAS = re.compile("\w+")
def alphas(s):
    return "".join(ALPHAS.findall(s.lower()))

# Fixup some naming issues in Bila kniha
def fixup_name(s):
    s = re.sub(" +", " ", s)
    return re.sub("jaderné", "Jaderné", s)

def tojson(o):
    return json.dumps(o, indent=4, sort_keys=True,ensure_ascii=False)

######################################################################
####### Phase 1: Parse and process Bila kniha first            #######
######################################################################

STUDY_PLANS = [parse(open(fn)) for fn in STUDY_PLAN_FILES]
#print(STUDY_PLANS)

OBORY = []

## 1a: Get info on all the courses. 
BK_COURSES1 = []
for sp in STUDY_PLANS:
    # Common info for all the courses:
    obor = sp.xpath("/stplan-export/nazev/text()")[0]
    OBORY.append(obor)
    typstudia = sp.xpath("/stplan-export/typstudia/text()")[0]
    for c in sp.xpath("/stplan-export/predmety/predmet[sem_idy/sem_idx/sem_id/text()=\""+CURRENT_SEMESTER+"\"]"):
        anotace = maybe_text(c, "texty/anotace")
        osnova = maybe_text(c, "texty/osnova")
        rozsah = maybe_text(c, "rozsah")
        osnova_cv = maybe_text(c, "osnova_cv")
        pozadavky = maybe_text(c, "pozadavky")
        cile = maybe_text(c, "cile")
        BK_COURSES1.append({
            "predmet_id": int(c.xpath("predmet_id/text()")[0]),
            "kod": c.xpath("kod/text()")[0],
            "nazev": c.xpath("nazev/text()")[0],
            "kredity": int(c.xpath("kredity/text()")[0]),
            "rozsah": rozsah,
            "rozvrhy": [], # TODO Put here the alternative sets of time slots for the subjects. For simplicity,
                           #      these are expected to be lists of numerical time slot identifiers.
            "zpuszak": c.xpath("zpuszak/text()")[0],
            "anotace": anotace,
            "osnova" : osnova,
            "pozadavky": pozadavky,
            "osnova_cv": osnova_cv,
            "cile": cile,
            "obor": obor            
            # "typstudia": typstudia, TODO do I actually need this if obor already covers this information anyway?            
        })

# 1b: Process information about obory. Most importantly normalize 
#     the data so that each course is represented once in the result.

# Sort obory in some consistent fashion,
# alphabetically, but with Bc. degrees first:
OBORY=list(sorted((o for o in OBORY if o.startswith("BS ")),key=alphas))+\
      list(sorted((o for o in OBORY if not o.startswith("BS ")), key=alphas))

# Translate original names into indices into a list of fixed names:
OBORY_TRANS = {o:i for o, i in zip(OBORY, range(len(OBORY)))}
# ...and also make the list of fixed names while you're at it.
OBORY=[fixup_name(o) for o in OBORY]

# Uncomment this to check the obory name translation for correctness:
# for o in OBORY_TRANS.keys(): print(repr(o) + " : " + str(OBORY_TRANS[o]) + " -> \n" + repr(OBORY[OBORY_TRANS[o]])+"\n")

print("Vyskytu predmetu celkem: "+str(len(BK_COURSES1)))
# BK_COURSES2 = list(set(BK_COURSES1))

BK_COURSES_GROUPED = defaultdict(lambda: [])
for c in BK_COURSES1:
    BK_COURSES_GROUPED[c["predmet_id"]].append(c)
print("Jedinecnych predmetu: "+str(len(BK_COURSES_GROUPED)))

# Just for debugging
# for k, v in BK_COURSES_GROUPED.items():
#     if len(v)>1:
#         print(str(k)+":")
#         for c in v:
#             print("    "+ #str(hash(str(c)))+":"+
#                         str(c)[:60]+"...")
#         print()

BK_COURSES2={}
for k,v in BK_COURSES_GROUPED.items():
    #c={k:v for k,v in BK_COURSES2.items() if not k=="obor"}
    c=dict(v[0])
    del c["obor"]
    # TODO It's necessary to consider if course roles in study plans have to be somehow extracted 
    #      and either used in output and/or consider in searches. For now it seems complicated.
    #      So maybe add some new code here... [Issue #]
    BK_COURSES2[k]=c

# TODO Need to determine what to do with the associations between subjects and obory/study plans
#      and add the necessary processing code here:
#for sp in STUDY_PLANS:
#    obor = sp.xpath("/stplan-export/nazev/text()")[0]
#    obor_id = OBORY_TRANS[obor]
#    print ("Obor c. "+str(obor_id)+":")  

######################################################################
####### Phase 1: Parse and process the time table              #######
######################################################################

# Heavy TODO here because of uncertainties of how to group time slots properly.
# The exact mechanism needs to be decided yet. Perhaps a heuristic with
# a manual override file for subjects with complicated time tables?

# ROZVRH = parse(open("20-21-zimni.xml"))

# DONE - Now just write the output file...
f = open("data.js", "w")
f.write("export const OBORY="+tojson(OBORY)+"\n\n")
f.write("export const COURSES="+tojson(BK_COURSES2)+"\n")
f.close()
