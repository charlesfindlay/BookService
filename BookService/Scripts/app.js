﻿var ViewModel = function () {
    var self = this;
    self.books = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();


    //Begin Add book
    self.authors = ko.observableArray();
    self.newBook = {
        Author: ko.observable(),
        Genre: ko.observable(),
        Price: ko.observable(),
        Title: ko.observable(),
        Year: ko.observable()
    }

    var authorsUri = '/api/authors/';

    function getAuthors() {
        ajaxHelper(authorsUri, 'GET').done(function (data) {
            self.authors(data);
        });
    }

    self.addBook = function (formElement) {
        var book = {
            AuthorId: self.newBook.Author().Id,
            //Author: self.newBook.Author(),
            Genre: self.newBook.Genre(),
            Price: self.newBook.Price(),
            Title: self.newBook.Title(),
            Year: self.newBook.Year()
        };

        ajaxHelper(booksUri, 'POST', book).done(function (item) {
            self.books.push(item);
        });
    }

    

    // End Add Book





    self.getBookDetail = function (item) {
        ajaxHelper(booksUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }



    var booksUri = '/api/books/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(function (data) {
            self.books(data);
        });
    }


    

        
    //Begin Add Author
    self.newAuthor =
        {
        Name: ko.observable()
        }

    var authorsUri = '/api/authors/';

    self.addAuthor = function (formElement) {
        var author = {

            Name: self.newAuthor.Name()

        };

        ajaxHelper(authorsUri, 'POST', author).done(function (item) {
            self.authors.push(item);
        });
    }


    // End Add Author







    // Fetch the initial data.
    getAllBooks();
    getAuthors();
};

ko.applyBindings(new ViewModel());