function onOff() {
        document.querySelector('#modal')
                .classList
                .toggle('hide');

        document.querySelector('body')
                .classList
                .toggle('hideScroll');

        document.querySelector('#modal')
                .classList
                .toggle('addScroll');
        }

function checkFields(event) {

        const valuesToCheck = [
                'title',
                'category',
                'image',
                'description',
                'link'
        ]

        const isEmpty = valuesToCheck.find(function(value) {

                let checkIfIsString = typeof event.target[value].value === 'string';
                
                let checkIfIsEmpty = !event.target[value].value.trim();

                if (checkIfIsString && checkIfIsEmpty) {
                        return true
                }
        })       

        if (isEmpty) {
                event.preventDefault();
                alert('Por favor, necessário preencher todos os campos.');
        }
}

