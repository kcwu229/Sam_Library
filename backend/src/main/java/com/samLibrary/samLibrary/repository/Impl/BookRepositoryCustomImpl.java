package com.samLibrary.samLibrary.repository.Impl;

import com.samLibrary.samLibrary.entity.Book;
import com.samLibrary.samLibrary.repository.BookRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public class BookRepositoryCustomImpl implements BookRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Book> searchBooksByAllFields(String searchText) {
        return List.of();
    }

    @Override
    public List<Book> searchBooksByField(String searchField, String searchText) {
        String queryString = "SELECT b FROM Book b WHERE LOWER(b." + searchField + ") LIKE LOWER(CONCAT('%', :searchText, '%'))";
        TypedQuery<Book> query = entityManager.createQuery(queryString, Book.class);
        query.setParameter("searchText", searchText);
        return query.getResultList();
    }


}
