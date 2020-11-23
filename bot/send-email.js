


(async () => {
  try {
    const { result, full } = await send({ text: "gmail-send example 1" });
    console.log(result);
  } catch (error) {
    console.error("ERROR", error);
  }
})();
