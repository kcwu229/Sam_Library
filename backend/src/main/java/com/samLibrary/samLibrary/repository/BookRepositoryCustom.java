package com.samLibrary.samLibrary.repository;

import com.samLibrary.samLibrary.entity.Book;

import java.util.List;

public interface BookRepositoryCustom {
    List<Book> searchBooksByAllFields(String searchText);
    List<Book> searchBooksByField(String searchField, String searchText);
}
