package pro200.neumont.edu.externaljournal.User;

import pro200.neumont.edu.externaljournal.Journal.Journal;

public class UserController {

    private User user;

    public UserController(User user) {
        this.user = user;
    }

    public User getUser() {
        return this.getUser();
    }

    public void addJournal(Journal j) {
        user.getJournals().add(j);
    }



}
