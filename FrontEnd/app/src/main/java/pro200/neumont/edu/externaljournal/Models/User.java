package pro200.neumont.edu.externaljournal.Models;

import java.util.List;

public class User
{
    private List<Journal> journals;
    private String userName;
    private String password;
    private String email;

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        if (password != null)
        {
            this.password = password;
        }
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        if (email != null)
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
        this.journals = journals;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        if (userName != null)
        {
            this.userName = userName;
        }
    }

    public User(String userName, String email, String password, List<Journal> journals)
    {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.journals = journals;
    }
}
