{
  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = inputs.nixpkgs.lib.systems.flakeExposed;
      perSystem =
        { config
        , self'
        , inputs'
        , pkgs
        , system
        , ...
        }:
        {
          devShells.default = pkgs.mkShell {
            nativeBuildInputs = with pkgs; [
              go-task
              lychee
            ] ++ [
              bundletool
              ffmpeg
              gst_all_1.gstreamer
              opencv
              (pkgs.writeShellScriptBin "bundletool.jar" ''
                exec bundletool "$@"
              '')
            ] ++ (with nodePackages; [
              nodejs
              pnpm
            ]);

            OPENCV4NODEJS_DISABLE_AUTOBUILD = "1";
          };
        };
    };

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
  };
}
