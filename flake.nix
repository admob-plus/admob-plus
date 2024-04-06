{
  outputs = inputs@{ flakelight, ... }:
    flakelight ./. {
      inherit inputs;

      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" ];

      devShell = { inputs', pkgs, stdenv, lib, ... }:
        let
          pkgs-stable = inputs'.nixpkgs-stable.legacyPackages;
        in
        pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            go-task
            lychee
          ] ++ [
            (bundletool.overrideAttrs (attrs: {
              postInstall = ''
                ln -s "$src" $out/bin/bundletool.jar
              '';
              }))
            ffmpeg
            gst_all_1.gstreamer
            opencv
          ] ++ (with nodePackages; [
            nodejs
            pnpm
          ]) ++ lib.optionals stdenv.isDarwin [
            cocoapods
          ];

          OPENCV4NODEJS_DISABLE_AUTOBUILD = "1";
        };
    };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixpkgs-stable.url = "github:NixOS/nixpkgs/768e0cf423e18cb56eb321f7b73609904d8f1611";
    flakelight = {
      url = "github:nix-community/flakelight";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
}
