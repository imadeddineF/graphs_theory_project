import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <div className="bg-primary3 text-white shadow-md flex items-center justify-center gap-3 py-5">
      <p className="text-[16px] font-medium">© 2024 Made by 3imad</p>
      <button>
        <GitHubIcon
          className="hover:scale-110 transition-all duration-300"
          onClick={() => window.open("https://github.com/imadeddineF")}
        />
      </button>
    </div>
  );
}
