import java.io.*;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.*;

public class ProjectTree {

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(".ts", ".js", ".tsx", ".html", ".css");
    private static final Set<String> IGNORED_DIRS = Set.of(".idea", "node_modules", ".git", ".next");

    public static void writeTreeAndContent(String rootDir, String outputFile) throws IOException {
        Path rootPath = Paths.get(rootDir);
        File root = rootPath.toFile();

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))) {

            writer.write(root.getName() + "\n");

            // Дерево проекта
            walkTree(root, "", writer);

            writer.write("\n\n// Files content\n\n");

            // Контент файлов
            Files.walkFileTree(rootPath, new SimpleFileVisitor<>() {

                @Override
                public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) {
                    if (IGNORED_DIRS.contains(dir.getFileName().toString())) {
                        return FileVisitResult.SKIP_SUBTREE;
                    }
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    if (isAllowedFile(file)) {
                        writer.write("\n--- " + rootPath.relativize(file) + " ---\n");
                        writer.write(Files.readString(file));
                        writer.write("\n");
                    }
                    return FileVisitResult.CONTINUE;
                }
            });
        }
    }

    private static void walkTree(File dir, String prefix, BufferedWriter writer) throws IOException {
        File[] files = dir.listFiles(file ->
            !IGNORED_DIRS.contains(file.getName()) &&
            (file.isDirectory() || isAllowedFile(file.toPath()))
        );

        if (files == null || files.length == 0) return;

        Arrays.sort(files, Comparator.comparing(File::getName));

        for (int i = 0; i < files.length; i++) {
            File file = files[i];
            boolean last = (i == files.length - 1);

            writer.write(prefix + (last ? "└── " : "├── ") + file.getName() + "\n");

            if (file.isDirectory()) {
                walkTree(
                    file,
                    prefix + (last ? "    " : "│   "),
                    writer
                );
            }
        }
    }

    private static boolean isAllowedFile(Path path) {
        String name = path.getFileName().toString().toLowerCase();
        return ALLOWED_EXTENSIONS.stream().anyMatch(name::endsWith);
    }

    public static void main(String[] args) throws IOException {
        String rootDir = args.length > 0
            ? args[0]
            : Paths.get("").toAbsolutePath().toString();

        writeTreeAndContent(rootDir, "project_structure.txt");
        System.out.println("Готово! Смотри файл project_structure.txt");
    }
}