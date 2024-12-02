package com.samLibrary.samLibrary.dto;

import com.samLibrary.samLibrary.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookListResponse {
    private BookDto bookDto;
    private int averageRating;
}
