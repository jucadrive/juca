package com.finalproject.book;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AladinItemListRes {

    private String title;
    private List<BookListItem> item;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BookListItem {
        private String title;
        private String author;
        private String pubDate;
        private String publisher;
        private String isbn13;
    }

}