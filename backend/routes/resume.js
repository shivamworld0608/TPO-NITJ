import { CreateResume,UpdateResume,DeleteResume } from '../controller/resume';
import Resume from '../models/resume';
const router = express.Router();

router.post("/resume",CreateResume);

app.put("/resume/:studentId",UpdateResume );
  
app.delete("/resume/:studentId", DeleteResume);