$(() => {
    const headerMenuButton = $('.bookmarks .row .menu-wrapper svg');
    const headerMenu = $('.bookmarks .row .menu-wrapper .menu-items');
    const body = $('body');

    headerMenuButton.click(() => {
        headerMenu.css('display', 'block');
    });

    $(document).mouseup((e) => {
        if (!headerMenu.is(e.target) && headerMenu.has(e.target).length === 0) {
            headerMenu.hide();
        }
    })

});

$(() => {
    const bookmarkMenuButton = $('.bookmarks .bookmark-items .bookmark-item svg')
    
    bookmarkMenuButton.click((event) => {
        const bookmarkMenu = $(event.target.parentNode.parentNode.querySelector('.menu-items'));
        bookmarkMenu.show();
        $(document).mouseup((e) => {
            if (!bookmarkMenu.is(e.target) && bookmarkMenu.has(e.target).length === 0) {
                bookmarkMenu.hide();
            }
        })
    });

});


$(() => {

    const ascendingSortOption = $('#ascending-sort-option');
    const descendingSortOption = $('#descending-sort-option');

    const bookmarkFilterForm = $('#bookmark-filter-form');
    const sortOptionAscending = $('#id_sort_by option[value=ascending]');
    const sortOptionDescending = $('#id_sort_by option[value=descending]');

    ascendingSortOption.click(() => {
        sortOptionAscending.attr('selected', '');
        sortOptionDescending.attr('selected', null);
        bookmarkFilterForm.submit();
    });

    descendingSortOption.click(() => {
        sortOptionAscending.attr('selected', null);
        sortOptionDescending.attr('selected', '');
        bookmarkFilterForm.submit();
    });

});


$(() => {
    $('#add-bookmark').click(() => {
        
        $("#bookmark-form").attr("action", "/bookmarks/create");
        
        $("#id_name").val("");
        $("#id_description").val("");
        $("#id_url").val("");
        $("#id_tags").val("")

        $('.add-bookmark-form').css('display', 'flex');
        $('.bookmarks .row .menu-wrapper .menu-items').hide()
    });
    $('.cancel-btn').click(() => {
        $('.add-bookmark-form').hide()
    });
}); 

$(() => {

    const bookmarkEditButton = $('.bookmarks .bookmark-items .bookmark-item .menu-items #edit-bookmark')
    
    bookmarkEditButton.click((event) => {

        editData = {
            url: event.target.parentNode.parentNode.parentNode.querySelector('.main a').href,
            name: event.target.parentNode.parentNode.parentNode.querySelector('.main a p').innerText,
            description: event.target.parentNode.parentNode.parentNode.querySelector('.info .description p').innerText,
            tags: event.target.parentNode.parentNode.parentNode.querySelector('.main input[name=tags]').value,
            pk: event.target.parentNode.parentNode.parentNode.querySelector('.main input[name=pk]').value
        }

        $("#id_name").val(editData.name);
        $("#id_description").val(editData.description);
        $("#id_url").val(editData.url);
        $("#id_tags").val(editData.tags);

        const bookmarkMenu = $(event.target.parentNode.parentNode);
        bookmarkMenu.hide();

        $("#bookmark-form").attr("action", "/bookmarks/" + editData.pk + "/edit");

        $('.add-bookmark-form').css('display', 'flex');
        $('.cancel-btn').click(() => {
            $('.add-bookmark-form').hide()
        });
    });
});