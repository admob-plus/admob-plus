{
  outputs =
    { conflake, ... }@inputs:
    conflake ./. {
      inherit inputs;

      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
      ];

      nixpkgs.config = {
        android_sdk.accept_license = true;
        allowUnfree = true;
      };

      devShell =
        {
          inputs',
          pkgs,
          stdenv,
          lib,
          androidenv,
          ...
        }:
        let
          buildToolsVersion = "35.0.1";
          androidComposition = androidenv.composeAndroidPackages {
            buildToolsVersions = [
              "34.0.0"
              buildToolsVersion
            ];
            platformVersions = [
              "34"
              "35"
            ];
            includeEmulator = true;
            includeSources = false;
            includeSystemImages = true;
            systemImageTypes = [ "google_apis" ];
            abiVersions = [ "x86_64" ];
            useGoogleAPIs = false;
            includeExtras = [ "extras;google;gcm" ];
          };
          androidSdk = androidComposition.androidsdk;
          jdk = pkgs.openjdk17_headless;

          ANDROID_HOME = "${androidSdk}/libexec/android-sdk";
        in
        pkgs.mkShell {
          inherit ANDROID_HOME;

          buildInputs =
            with pkgs;
            [
              biome
              go-task
              lychee
            ]
            ++ [
              androidSdk
              jdk
              (bundletool.overrideAttrs (attrs: {
                postInstall = ''
                  ln -s "$src" $out/bin/bundletool.jar
                '';
              }))
              ffmpeg
              gst_all_1.gstreamer
              opencv
            ]
            ++ (with nodePackages; [
              nodejs
              pnpm
            ])
            ++ lib.optionals stdenv.isDarwin [
              cocoapods
            ];

          ANDROID_JAVA_HOME = "${jdk.home}";
          ANDROID_SDK_ROOT = "${ANDROID_HOME}";
          ANDROID_NDK_ROOT = "${ANDROID_HOME}/ndk-bundle";
          GRADLE_OPTS = "-Dorg.gradle.project.android.aapt2FromMavenOverride=${ANDROID_HOME}/build-tools/${buildToolsVersion}/aapt2";

          OPENCV4NODEJS_DISABLE_AUTOBUILD = "1";
          QT_QPA_PLATFORM = "wayland;xcb";
        };
    };

  inputs = {
    conflake = {
      url = "github:ratson/conflake";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };
}
