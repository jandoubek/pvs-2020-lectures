import React from 'react';
import List from "@material-ui/core/List";
import SubjectPreview from "./SubjectPreview";
import SubjectDialog from "./SubjectDialog";


const ResultsList = ({subjects}) => {
    const [showingSubject, setShowingSubject] = React.useState(null);

    const handleShowMore = (e, subject) => {
        e.preventDefault();
        setShowingSubject(subject);
    };

    const handleCloseDialog = () => {
        setShowingSubject(null);
    };

    return (
        <React.Fragment>
            <List>
                {subjects.map(subject =>
                    <SubjectPreview
                        key={subject.code}
                        subject={subject}
                        onShowMore={handleShowMore}
                    />
                )}
            </List>
            {showingSubject &&
                <SubjectDialog
                    subject={showingSubject}
                    onClose={handleCloseDialog}
                />
            }
        </React.Fragment>
    );
};

export default ResultsList;