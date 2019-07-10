module.exports = class Highlighter {
    constructor(field, number_of_fragments, fragment_size, pre_tags, post_tags) {
        this.field = field;
        this.number_of_fragments = number_of_fragments;
        this.fragment_size = fragment_size;
        this.pre_tags = pre_tags;
        this.post_tags = post_tags;
    }

    toString() {
        return `"highlight":{"fields":{"${this.field}":{"number_of_fragments":${this.number_of_fragments},"fragment_size":${this.fragment_size},"pre_tags":["${this.pre_tags}"],"post_tags":["${this.post_tags}"]}}}`
    }
}