package com.example.tritonone;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import org.json.JSONArray;
import org.json.JSONObject;



public class FetchResultTest {

	public static void main(String[] args) throws Exception{
		// TODO Auto-generated method stub
		URL urlObject=new URL("http://hubblesite.org/api/v3/videos/all?page=all");
		URLConnection con = urlObject.openConnection();
		InputStream is = con.getInputStream();
		BufferedReader br = new BufferedReader(new InputStreamReader(is));
		String line =  br.readLine();
		System.out.println(line);
		
		JSONArray jsonArray=new JSONArray(line);
		System.out.println(jsonArray.toString(3));
	}

}
