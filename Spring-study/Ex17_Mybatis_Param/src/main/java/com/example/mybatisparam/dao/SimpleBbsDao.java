package com.example.mybatisparam.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.mybatisparam.dto.*;

@Repository
public class SimpleBbsDao implements ISimpleBbsDao {
	
	@Autowired
	JdbcTemplate template;

	@Override
	public List<SimpleBbsDto> listDao() {
		System.out.println("listDao()");
		
		String query = "select * from simple_bbs order by id desc";
		List<SimpleBbsDto> dtos = template.query(query, new BeanPropertyRowMapper<>(SimpleBbsDto.class));
		
		return dtos;
	}

	@Override
	public SimpleBbsDto viewDao(String id) {
		System.out.println("viewDao()");
		
		String query = "select * from simple_bbs where id = " + id;
		SimpleBbsDto dto = template.queryForObject(query, new BeanPropertyRowMapper<>(SimpleBbsDto.class));
		
		return dto;
	}

	@Override
	public int writeDao(final String writer, final String title, final String content) {
		System.out.println("writeDao()");
		
		String query = "insert into simple_bbs (id, writer, title, content) " + 
		" values (simple_bbs_seq.nextval, ?, ?, ?)";
		
		return template.update(query, writer, title, content);
	}

	@Override
	public int deleteDao(String id) {
		System.out.println("deleteDao()");
		String query = "delete from simple_bbs where id = ?";
		
		return template.update(query, Integer.parseInt(id));
	}
	
	
}
