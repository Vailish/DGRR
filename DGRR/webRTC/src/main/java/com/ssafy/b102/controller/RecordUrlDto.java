package com.ssafy.b102.controller;

import io.openvidu.java.client.Recording;

public class RecordUrlDto {
	Recording recording;
	String url;
	
	public RecordUrlDto(Recording recording, String url) {
		super();
		this.recording = recording;
		this.url = url;
	}
}