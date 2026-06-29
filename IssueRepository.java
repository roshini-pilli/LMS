package com.library.lms.repository;

import com.library.lms.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository
        extends JpaRepository<Issue, Long> {
}