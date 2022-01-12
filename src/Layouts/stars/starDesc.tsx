import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Input,
} from "@mui/material";
import { useState } from "react";

const resources = ["STF", "AIF", "מודל UWI", "מודל ASB", "חימוש אמיתי"];

const StarDesc = () => {
  const [resourceList, setResourceList] = useState([]);

  return (
    <div className="starDesc">
      <div className="header">
        <h1>
          <span id="priority"> 1 </span>#33 - הצמדת יעף לא עובדת
        </h1>
        <span>בלוק ו רעם</span>
      </div>
      <div className="starData">
        <div className="dataCol">
          <div className="dataRow">
            <Typography variant="caption" sx={{ padding: "7px 7px 7px 0" }}>
              הועלה ע"י גדות - מא"ב מתוך גיחת ניסוי בלוק ו רעם 10/01/2021
            </Typography>
          </div>
          <div className="dataRow">
            <TextField
              sx={{ margin: "7px", flexGrow: 1 }}
              label="גורם מטפל"
              defaultValue="מאב"
              variant="outlined"
            />
            <TextField
              sx={{ margin: "7px", flexGrow: 1 }}
              label="סטטוס"
              defaultValue="פתוח"
              variant="outlined"
            />
          </div>
          <div className="dataRow">
            <FormControl sx={{ width: "90%" }}>
              <InputLabel id="resources">משאבים נדרשים</InputLabel>
              <Select
                labelId="resources"
                multiple
                value={resourceList}
                onChange={(e: any) => setResourceList(e.target.value)}
                input={<Input />}
                renderValue={(selected: any) => (
                  <div>
                    {selected.map((value: string) => (
                      <Chip
                        key={value}
                        label={value}
                      />
                    ))}
                  </div>
                )}
              >
                {resources.map((resource: string) => (
                  <MenuItem key={resource} value={resource}>
                    {resource}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="dataCol">
          <TextField
            sx={{ display: "grid", height: "123px", marginTop: "42px" }}
            label="תיאור"
            defaultValue="הצמדת יעף עובדת בצורה לא דטרמיניסטית ממסכים שונים. כשההצמדה עובדת היעף מנצנץ ב-BM בניגוד לאפיון"
            variant="outlined"
            multiline
          />
        </div>
      </div>
    </div>
  );
};

export default StarDesc;
