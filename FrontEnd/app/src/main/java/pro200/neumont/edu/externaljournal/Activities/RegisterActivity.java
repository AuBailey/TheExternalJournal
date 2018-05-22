package pro200.neumont.edu.externaljournal.Activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import pro200.neumont.edu.externaljournal.R;

public class RegisterActivity  extends AppCompatActivity
{
    private Button mRegisterButton;
    private EditText email;
    private EditText username;
    private EditText password;
    private EditText passwordConfirmation;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mRegisterButton = (Button) findViewById(R.id.register_btn);

        email = (EditText) findViewById(R.id.email_edit_text);
        username = (EditText) findViewById(R.id.username_edit_text);
        password = (EditText) findViewById(R.id.password_edit_text);
        passwordConfirmation = (EditText) findViewById(R.id.passwordConfirmation_edit_text);
        if(password.getText() != passwordConfirmation.getText())
        {
            //invalid login
        }
        mRegisterButton.setOnClickListener((v) -> {
            Toast.makeText(this, "Denied", Toast.LENGTH_SHORT).show();
        });
    }
}
