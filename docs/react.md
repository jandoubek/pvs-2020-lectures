# Vývoj

Při vývoji je nutné mít chceckoutnutou správnou branch. Následně je potřeba nejprve zavolat
(lze tak učinit v terminálu přímo ve Webstrom). 
```
npm install
```
Pozor toto může trvat i celkem dlouho.

Pro spuštěná serveru na localhost zavolejte:
```
npm start
```
Tento command by default spustí server na [localhost:3000](http://localhost:3000/). Na tomto
odkazu tedy existuje naše stránka.

## Prvná krůček

Jako první krůček doporučuji otevřít file `src/Logo.js` a změnit text:
```javascript
<Link href="#" onClick={(e) => {e.preventDefault(); history.push("/");}} className={classes.link}>
    PŘEDMĚTY
</Link>
```

Toto změna by se měla automaticky promítnout na vzhledu stránky.