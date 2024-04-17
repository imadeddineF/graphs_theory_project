import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <div className="bg-[#3f72af] border-t-[1px] border-t-[#06121f] text-white flex items-center justify-center gap-3 py-4">
      <p className="text-[14px]">© 2024 Made by 3imad</p>
      <button>
        <GitHubIcon
          onClick={() =>
            window.open("https://github.com/imadeddineF/graphs_theory_project")
          }
        />
      </button>
    </div>
  );
}
