jQuery(document).ready(function($) {
    $('#cn_pf_widget')
        .after('<div id="cnnav">')
        .cycle({
            fx:    'fade',
            delay: -3000,
            timeout : 2000,
            pager:  '#cnnav',
            speed:  2000
        });
    $('.mix').hoverDirection();
});
