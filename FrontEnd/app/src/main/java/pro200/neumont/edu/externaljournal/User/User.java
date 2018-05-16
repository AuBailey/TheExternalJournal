package pro200.neumont.edu.externaljournal.User;

import pro200.neumont.edu.externaljournal.Journal.Journal;

import java.util.List;

public class User
{
    private List<Journal> journals;
    private String userName;
    private String password;
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

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        if (password != null && password != "")
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

    public String getUserName()
    {
        return userName;
    }

    public void setUserName(String userName)
    {
        if (userName != null && userName != "")
        {
            this.userName = userName;
        }
    }

    public User(String userName, String email, String password, List<Journal> journals, String token)
    {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.journals = journals;
        this.token = token;
    }
}
