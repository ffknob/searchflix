function onLoad() {
    rxjs.fromEvent(document.getElementById('terms'), 'keypress')
        .subscribe(
            (event) => {
                if (event.charCode == 13) {
                    onSubmitSearchForm();
                }
            }
        );
}

