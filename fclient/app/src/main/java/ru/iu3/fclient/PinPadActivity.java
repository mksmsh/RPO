package ru.iu3.fclient;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class PinPadActivity extends Activity {
    TextView tvPin;
    String pin="";

    @Override
    protected void onCreate(Bundle saveInstanceState) {
        super.onCreate(saveInstanceState);
        setContentView(R.layout.activity_pinpad);
        tvPin = findViewById(R.id.txtPin);
        ShuffleKeys();

        findViewById(R.id.buttonOK).setOnClickListener((View)->{
            Intent it = new Intent();
            it.putExtra("pin", pin);
            setResult(RESULT_OK, it);
            finish();
        });

        findViewById(R.id.buttonReset).setOnClickListener((View)->{
            pin = "";
            tvPin.setText("");
        });
        findViewById(R.id.button0).setOnClickListener((View)->{
            keyClick(View);
        });
        findViewById(R.id.button1).setOnClickListener((View)->{
            keyClick(View);
        });
        findViewById(R.id.button2).setOnClickListener((View)->{
            keyClick(View);
        });
        findViewById(R.id.button3).setOnClickListener((View)->{
            keyClick(View);
        });
        findViewById(R.id.button4).setOnClickListener((View)->{
            keyClick(View);
        });
        findViewById(R.id.button5).setOnClickListener((View)->{
            keyClick(View);
        });
        findViewById(R.id.button6).setOnClickListener((View)->{
            keyClick(View);
        });
        findViewById(R.id.button7).setOnClickListener((View)->{
            keyClick(View);
        });
        findViewById(R.id.button8).setOnClickListener((View)->{
            keyClick(View);
        });
        findViewById(R.id.button9).setOnClickListener((View)->{
            keyClick(View);
        });
    }
    protected void keyClick(View v){
        String key = ((TextView)v).getText().toString();
        int sz = pin.length();
        if(sz<4){
            pin+=key;
            tvPin.setText("****".substring(3-sz));
        }
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if(requestCode == 0)
        {
            if (resultCode == RESULT_OK || data != null)
            {
                String pin = data.getStringExtra("pin");
                Toast.makeText(this, pin, Toast.LENGTH_SHORT).show();
            }
        }
    }

    final int MAX_KEYS = 10;
    protected void ShuffleKeys(){
        Button keys[] = new Button[] {
                findViewById(R.id.button0),
                findViewById(R.id.button1),
                findViewById(R.id.button2),
                findViewById(R.id.button3),
                findViewById(R.id.button4),
                findViewById(R.id.button5),
                findViewById(R.id.button6),
                findViewById(R.id.button7),
                findViewById(R.id.button8),
                findViewById(R.id.button9),
        };
        byte[] rnd = MainActivity.randomBytes(MAX_KEYS);
        for(int i = 0; i < MAX_KEYS; i++)
        {
            int idx = (rnd[i]&0xFF)%10;
            CharSequence txt = keys[idx].getText();
            keys[idx].setText(keys[i].getText());
            keys[i].setText(txt);
        }
    }
}
