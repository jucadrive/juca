package com.study.jpa.bookmanager.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.study.jpa.bookmanager.domain.Book;

@SpringBootTest
public class BookRepositoryTest {

	@Autowired
	BookRepository bookRepository;
	
	@Test
	void bookTest() {
		Book book = new Book();
		book.setName("JPA 초격차 패키지");
		book.setAuthor("패스트캠퍼스");
		
		bookRepository.save(book);
		
		System.out.println(bookRepository.findAll());
	}
}
