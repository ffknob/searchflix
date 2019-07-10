module.exports = {
    highlight: (content, highlights) => {
        let contentHighlighted = content;

        if (highlights) {
            highlights.forEach(highlight => {
                const highlightWithoutTags = highlight.replace(/<\/?\w*>/g, '');
                contentHighlighted = contentHighlighted.replace(highlightWithoutTags, highlight);
            });        
        }

        return contentHighlighted;
    }
};