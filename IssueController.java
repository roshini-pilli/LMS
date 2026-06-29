package com.library.lms.controller;

import com.library.lms.model.Book;
import com.library.lms.model.Issue;
import com.library.lms.repository.BookRepository;
import com.library.lms.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/issues")
@CrossOrigin("*")
public class IssueController {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    @PostMapping
    public Issue issueBook(@RequestBody Issue issue) {

        List<Book> books = bookRepository.findAll();

        for (Book book : books) {

            if (book.getTitle().equalsIgnoreCase(issue.getBookTitle())) {

                if (book.getQuantity() > 0) {

                    book.setQuantity(book.getQuantity() - 1);
                    bookRepository.save(book);

                    return issueRepository.save(issue);
                }
            }
        }

        throw new RuntimeException("Book not available");
    }

    @DeleteMapping("/{id}")
    public String returnBook(@PathVariable Long id) {

        Issue issue = issueRepository.findById(id).orElseThrow();

        List<Book> books = bookRepository.findAll();

        for (Book book : books) {

            if (book.getTitle().equalsIgnoreCase(issue.getBookTitle())) {

                book.setQuantity(book.getQuantity() + 1);
                bookRepository.save(book);
                break;
            }
        }

        issueRepository.deleteById(id);

        return "Book Returned Successfully";
    }
}