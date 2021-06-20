package ru.iu3.fclient;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.io.IOUtils;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainActivity extends AppCompatActivity {

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
        System.loadLibrary("mbedcrypto");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btn = findViewById(R.id.btnClickMe);
        btn.setOnClickListener((View v) -> {
            onButtonClick(v);
        });

        Button btnTestHttp = findViewById(R.id.buttonTestHttp);
        btnTestHttp.setOnClickListener((View v) -> {
            onButtonTestHttpClick(v);
        });

        int res = initRng();
        Log.i("fclient", "Init Rng = " + res);
    }

    public static byte[] StringToHex(String s) {
        byte[] hex;
        try {
            hex = Hex.decodeHex(s.toCharArray());
        }
        catch (DecoderException ex) {
            hex = null;
        }
        return hex;
    }

    protected void onButtonClick(View v) {
        Intent it = new Intent(this, PinPadActivity.class);
        startActivityForResult(it, 0);
    }
    protected void onButtonTestHttpClick(View v) {
        TestHttpClient();
    }
    protected void TestHttpClient() {
        new Thread(() -> {
            try {
//              HttpURLConnection uc = (HttpURLConnection) (new URL("https://www.wikipedia.org").openConnection());
                HttpURLConnection uc = (HttpURLConnection) (new URL("http://10.0.2.2:8081/api/v1/title").openConnection());
                InputStream inputStream = uc.getInputStream();
                String html = IOUtils.toString(inputStream);
                String title = getPageTitle(html);
                runOnUiThread(() -> {
                    Toast.makeText(this, title, Toast.LENGTH_SHORT).show();
                });
            } catch (Exception ex) {
                Log.e("fapptag", "Http client fails", ex);
            }
        }).start();
    }



    protected String getPageTitle(String html){
//        int pos = html.indexOf("<title");
//        String p = "not found";
//        if(pos >=0){
//            int pos2 = html.indexOf("<", pos+1);
//            if(pos2>=0){
//                p = html.substring(pos+7, pos2);
//            }
//        }
//        return p;
        Pattern partern = Pattern.compile("<title>(.+?)</title>", Pattern.DOTALL);
        Matcher matcher = partern.matcher(html);
        String p;
        if(matcher.find())
            p = matcher.group(1);
        else
            p = "Not found";
        return p;
    }
    public native String stringFromJNI();
    public static native int initRng();
    public static native byte[] randomBytes(int no);
    public static native byte[] encrypt(byte[] key, byte[] data);
    public static native byte[] decrypt(byte[] key, byte[] data);


}