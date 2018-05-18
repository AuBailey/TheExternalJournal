package pro200.neumont.edu.externaljournal.Model.User;

import pro200.neumont.edu.externaljournal.Model.Journal.Journal;

import java.util.List;

public class User
{
    private List<Journal> journals;
    private String email;
    private String token;

    public String getToken()
    {
        return token;
    }

    public void setToken(String token)
    {
        this.token = token;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        if (email != null && email != "")
        {
            this.email = email;
        }
    }

    public List<Journal> getJournals()
    {
        return journals;
    }

    public void setJournals(List<Journal> journals)
    {
        if (journals != null)
        {
            this.journals = journals;
        }
    }


    public User(String email, List<Journal> journals, String token)
    {
        this.email = email;
        this.journals = journals;
        this.token = token;
    }
}
