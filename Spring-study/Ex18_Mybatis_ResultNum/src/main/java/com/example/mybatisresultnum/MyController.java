package com.example.mybatisresultnum;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.mybatisresultnum.dao.*;

@Controller
public class MyController {

	@Autowired
	ISimpleBbsDao dao;
	
	@RequestMapping("/")
	public String root() throws Exception {
		// MyBatis : SimpleBBS
		return "redirect:list";
	}
	
	@RequestMapping("/list")
	public String userlistPage(Model model) {
		model.addAttribute("list", dao.listDao());
		
		int nTotalCount = dao.articleCount();	// 글의 개수를 가져온다
		System.out.println("Count : " + nTotalCount);
		return "/list";
	}
	
	@RequestMapping("/view")
	public String view(HttpServletRequest request, Model model) {
		String sId = request.getParameter("id");
		model.addAttribute("dto", dao.viewDao(sId));
		return "/view";
	}
	
	@RequestMapping("/writeForm")
	public String writeForm() {
		return "/writeForm";
	}
	
	@RequestMapping("/write")
	public String write(HttpServletRequest request, Model model) {
		String sName = request.getParameter("writer");
		String sTitle = request.getParameter("title");
		String sContent = request.getParameter("content");
		
		Map<String, String> map = new HashMap<>();
		map.put("item1", sName);
		map.put("item2", sTitle);
		map.put("item3", sContent);
		
		int nResult = dao.writeDao(map);
		System.out.println("Write : " + nResult);
		return "redirect:list";
	}
	
	@RequestMapping("/delete")
	public String delete(HttpServletRequest request, Model model) {
		String sId = request.getParameter("id");
		int nResult = dao.deleteDao(sId);
		System.out.println("Delete : " + nResult);
		return "redirect:list";
	}
}
