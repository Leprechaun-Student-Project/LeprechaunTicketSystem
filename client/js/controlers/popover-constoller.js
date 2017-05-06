import * as data from 'data';

console.log(data.getPopoverValue(100));

function initiatePopover() {
    $('[data-toggle="popover"]').popover({
        html: true,
        content: ""
    });
    updatePopover();
}

function updatePopover() {
    $('#quick-serach-input').keyup(function () {
        const popover = $('[data-toggle="popover"]').data('bs.popover');
        const currentInput = ($('#quick-serach-input').val());
        let popoverText = data.getPopoverValue(currentInput);
        popover.options.content = currentInput;
        $('[data-toggle="popover"]').popover('show');
    });
}
export {
    initiatePopover
}