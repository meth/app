package com.hiddentao.meth.mobile.app;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.horcrux.svg.SvgPackage;
import net.rhogan.rnsecurerandom.RNSecureRandomPackage;
import com.instabug.library.Instabug;
import com.instabug.library.InstabugColorTheme;
import com.instabug.library.invocation.InstabugInvocationEvent;
// import com.kevinejohn.RNMixpanel.RNMixpanel;
import com.oblador.vectoricons.VectorIconsPackage;
// import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  public static final String TAG = "MainApplication";

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                        new MainReactPackage(),
                          new RNDeviceInfo(),
                        new SvgPackage(),
                        new RNSecureRandomPackage(),
                        new VectorIconsPackage()
                    );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    if (Config.INSTABUG_ENABLED) {
      Log.i(TAG, "Instabug enabled");

      new Instabug.Builder(this, Config.INSTABUG_TOKEN)
              .setInvocationEvent(InstabugInvocationEvent.SHAKE)
              .setTheme(InstabugColorTheme.InstabugColorThemeLight)
              .setIntroMessageEnabled(false)
              .build();
    }

    SoLoader.init(this, /* native exopackage */ false);
  }
}
