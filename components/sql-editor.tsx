import { Button } from "@/components/ui/button";
import { sql, SQLite } from "@codemirror/lang-sql";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { Code } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export interface SQLEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function SQLEditor({ value, onChange, placeholder }: SQLEditorProps) {
  const codeMirrorRef = useRef<ReactCodeMirrorRef>(null);

  const handleFormat = async () => {
    const { formatDialect, sqlite: formatterSqlite } = await import(
      "sql-formatter"
    );

    const formattedCode = formatDialect(value ?? "", {
      dialect: formatterSqlite,
      keywordCase: "upper",
    });

    onChange?.(formattedCode);
    toast.success("成功格式化 SQL 程式碼");
  };

  return (
    <div className="flex flex-col gap-4">
      <CodeMirror
        className={"rounded border border-input text-sm"}
        ref={codeMirrorRef}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        extensions={[
          sql({
            dialect: SQLite,
            upperCaseKeywords: true,
          }),
        ]}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleFormat();
        }}
      >
        <Code />
        格式化
      </Button>
    </div>
  );
}
