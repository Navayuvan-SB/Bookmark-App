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
    const bookmarkMenuButton = $('.bookmarks .bookmark-items .bookmark-item svg.bookmark-menu')
    
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
    const bookmarkExpandButton = $('.bookmarks .bookmark-items .bookmark-item svg.bookmark-expand');
    bookmarkExpandButton.click((event) => {

        const bookmarkMenu = $(event.target.parentNode.parentNode);
        bookmarkMenu.toggleClass('expand')

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


$(() => {
    const bookmarkDeleteButton = $('.bookmarks .bookmark-items .bookmark-item .menu-items #delete-bookmark')
    
    bookmarkDeleteButton.click((event) => {

        const pk = event.target.parentNode.parentNode.parentNode.querySelector('.main input[name=pk]').value;

        const bookmarkMenu = $(event.target.parentNode.parentNode);
        bookmarkMenu.hide();

        const deleteForm = $(".delete-bookmark-form");
        deleteForm.css('display', 'flex');

        $("#delete-bookmark-form").attr("action", "/bookmarks/" + pk + "/delete");

        $('.cancel-btn').click(() => {
            deleteForm.hide()
        });
    });
});


$(() => {
    const folderSelectElement = $("#id_folder");
    const options = folderSelectElement.children();

    const folderSelectedValue = folderSelectElement.val();
    const folderWrapper = $(".folder-wrapper");
    const mockFolder = $(".folder-wrapper .folder.hidden");

    var folder = mockFolder.clone()
    folder.removeClass('hidden');

    if (folderSelectedValue){
        folder.removeClass('active');
    }
    
    var folderName = folder.find('p')
    folderName.html('All bookmarks')

    var bookmarkId = folder.find('input[name=id]')
    bookmarkId.val(0)

    folderWrapper.append(folder);

    for (let i = 1; i < options.length; i ++){
        option = $(options[i]).html()
        value = $(options[i]).val()

        var folder = mockFolder.clone()
        folder.removeClass('hidden');

        if (value != folderSelectedValue){
            folder.removeClass('active');
        }
        
        
        var folderName = folder.find('p')
        folderName.html(option)

        var bookmarkId = folder.find('input[name=id]')
        bookmarkId.val(value)

        folderWrapper.append(folder);
        
    }

    const folderElement = $(".folder-wrapper .folder");
    folderElement.click((event) => {
        const bookmarkFilterForm = $('#bookmark-filter-form');
        const id = event.target.parentNode.querySelector('input').value
        
        folderSelectElement.val(id);
        bookmarkFilterForm.submit();
    })
});