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

      devShell =
        {
          inputs',
          pkgs,
          stdenv,
          lib,
          ...
        }:
        pkgs.mkShell {
          nativeBuildInputs =
            with pkgs;
            [
              go-task
              lychee
            ]
            ++ [
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

          OPENCV4NODEJS_DISABLE_AUTOBUILD = "1";
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
