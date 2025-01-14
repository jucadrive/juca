package com.study.jpa.bookmanager.domain.lisetener;

import java.time.LocalDateTime;

public interface Auditable {
	LocalDateTime getCreatedAt();
	LocalDateTime getUpdatedAt();
	
	void setCreatedAt(LocalDateTime createdAt);
	void setUpdatedAt(LocalDateTime updatedAt);
}
