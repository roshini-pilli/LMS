package com.library.lms.controller;

import com.library.lms.model.Book;
import com.library.lms.repository.BookRepository;
import com.library.lms.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private IssueRepository issueRepository;

    @GetMapping
    public Map<String, Long> getStats() {

        Map<String, Long> stats = new HashMap<>();

        List<Book> books = bookRepository.findAll();

        // Total number of book copies
        long totalBooks = 0;

        for (Book book : books) {
            totalBooks += book.getQuantity();
        }

        // Total books currently issued
        long issuedBooks = issueRepository.count();

        // Available books
        long availableBooks = totalBooks - issuedBooks;

        stats.put("totalBooks", totalBooks);
        stats.put("issuedBooks", issuedBooks);
        stats.put("availableBooks", availableBooks);

        return stats;
    }
}