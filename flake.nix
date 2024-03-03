{
  outputs = inputs@{ flakelight, ... }:
    flakelight ./. {
      inherit inputs;

      devShell = { inputs', pkgs, stdenv, lib, ... }:
        let
          pkgs-stable = inputs'.nixpkgs-stable.legacyPackages;
        in
        pkgs.mkShell {
          nativeBuildInputs = with pkgs; [
            go-task
            lychee
          ] ++ [
            bundletool
            ffmpeg
            gst_all_1.gstreamer
            opencv
            (writeShellScriptBin "bundletool.jar" ''
              exec bundletool "$@"
            '')
          ] ++ (with nodePackages; [
            nodejs
            pnpm
          ]) ++ lib.optionals stdenv.isDarwin [
            pkgs-stable.cocoapods
          ];

          OPENCV4NODEJS_DISABLE_AUTOBUILD = "1";
        };
    };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    nixpkgs-stable.url = "github:NixOS/nixpkgs/768e0cf423e18cb56eb321f7b73609904d8f1611";
    flake-parts = {
      url = "github:nix-community/flakelight";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
  };
}
