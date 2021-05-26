package com.example.tritonone;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestExistence {

	@GetMapping("/create")
	public String create() {
		try {
			FileWriter fwFileWriter=new FileWriter(new File("test.txt"));
			fwFileWriter.write("asd");
			fwFileWriter.close();return "created";
		} catch (Exception e) {
			// TODO: handle exception
			return e.getLocalizedMessage();
		}
	}
	
	@GetMapping("/te")
	public String te() {
		try {
			FileReader fwFileWriter=new FileReader(new File("test.txt"));
			return fwFileWriter.read()+"";
		} catch (Exception e) {
			// TODO: handle exception
			return e.getLocalizedMessage();
		}
	}
}
