import {
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { activityLogExample, activityLogType } from "../../assets/star";

const StarActivity = () => {
  return (
    <div className="feedSection">
      <Typography variant="h5" paddingBottom="10px">
        פעילות
      </Typography>
      {activityLogExample.map((log: activityLogType) => {
        return (
          <Card sx={{height: '50px',margin: '10px', border: '1px solid silver', borderRadius: '2px'}}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                <span>{log.publisher}</span>
                <span> {log.action}</span>
                <span style={{ display: log.value ? "" : "none" }}>
                  {" "}
                  ל-{log.value}
                </span>
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StarActivity;
