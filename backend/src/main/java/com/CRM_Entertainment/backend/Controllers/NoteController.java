package com.CRM_Entertainment.backend.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.CRM_Entertainment.backend.Models.DAO.INoteDao;
import com.CRM_Entertainment.backend.Models.Entity.Note;

@Controller
@RequestMapping("/note")
public class NoteController {
    @Autowired
    private INoteDao noteDao;

    @GetMapping
    @ResponseBody
    public ResponseEntity<Object> createNote() {
        Note note = new Note();
        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<List<Note>> getAllNotes() {
        List<Note> notes = noteDao.findAll();
        return new ResponseEntity<>(notes, HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    @ResponseBody
    public ResponseEntity<Object> getNote(@PathVariable Long id) {
        Note note = noteDao.findOne(id);
        if (note == null) {
            return new ResponseEntity<>(new ErrorResponse("Note not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    @PostMapping
    @ResponseBody
    public ResponseEntity<Object> createNote(@RequestBody Note note) {
        noteDao.save(note);
        return new ResponseEntity<>(new SuccessResponse("Note created successfully"), HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseBody
    public ResponseEntity<Object> deleteNote(@PathVariable Long id) {
        if (id > 0) {
            noteDao.delete(id);
            return new ResponseEntity<>(new SuccessResponse("Note deleted successfully"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ErrorResponse("Invalid note ID"), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/edit/{id}")
    @ResponseBody
    public ResponseEntity<Object> editNote(@PathVariable(value = "id") Long id) {
        if (id == null || id <= 0) {
            return new ResponseEntity<>(new ErrorResponse("Invalid note ID"), HttpStatus.BAD_REQUEST);
        }

        Note note = noteDao.findOne(id);
        if (note == null) {
            return new ResponseEntity<>(new ErrorResponse("Note not found"), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(note, HttpStatus.OK);
    }

    public static class ErrorResponse {
        private String error;

        public ErrorResponse(String error) {
            this.error = error;
        }

        public String getError() {
            return error;
        }

        public void setError(String error) {
            this.error = error;
        }
    }

    public static class SuccessResponse {
        private String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
