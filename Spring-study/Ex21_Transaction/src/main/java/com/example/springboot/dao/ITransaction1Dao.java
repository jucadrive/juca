package com.example.springboot.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ITransaction1Dao {
	public void pay(String consumerId, int amount);
}
