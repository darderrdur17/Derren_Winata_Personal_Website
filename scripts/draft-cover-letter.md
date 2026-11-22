# Derren Winata — reusable cover-letter draft

> Updated 2026-11-22 to include the browser-upload version of VisionCount.
> Replace the bracketed fields with the role and company specifics before
> sending. Keep the claims modest: the paper is **in preparation**, and the
> university collaborators stay described by role.

---

Dear [Hiring team / Name],

I'm applying for [role] at [company]. I'm finishing a Data Science & Analytics degree at NUS, and the work I've liked most has been where a model has to hold up outside a notebook — where someone else can use it and question the number it gives back.

In an ongoing research collaboration with a university team, I built VisionCount, a tool that started as a crowd-counting prototype for a paper on Bali's tourist levy and is now a small web product. You upload a video or a set of images, choose the objects to count, and get a chart plus CSV and figure exports. Getting it running in the browser meant exporting the YOLO model to ONNX so the service didn't need the full training stack. The more useful lesson was in the measurement: I hand-counted a validation clip, found the library's tracking API had quietly replaced the detection count with tracks, fixed it, and calibrated until ten of ten frames landed within ±15% of the human count. The interface now says plainly what the numbers are — an uploaded clip gets no hourly extrapolation, and files are deleted after an hour.

I'd like to bring that combination of building the thing and checking the thing to [company], especially [one specific reason this role or team fits — a product, a dataset, a constraint they care about]. [One plain, human detail about why this work interests you.]

Happy to talk whenever it suits you.

Derren Winata
wderren17@gmail.com
