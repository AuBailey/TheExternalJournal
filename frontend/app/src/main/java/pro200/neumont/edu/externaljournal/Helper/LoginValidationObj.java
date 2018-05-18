package pro200.neumont.edu.externaljournal.Helper;

public class LoginValidationObj {

    private boolean success;
    private String message;

    public LoginValidationObj(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }
}
