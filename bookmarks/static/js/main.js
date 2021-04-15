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
        const bookmarkMenu = $(event.target.parentNode.querySelector('.menu-items'));
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