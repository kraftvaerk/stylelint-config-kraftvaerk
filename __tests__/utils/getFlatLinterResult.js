export default function getFlatLinterResult(result) {
    const { errored, results } = result;
    const { warnings } = results[0];

    return { errored, warnings };
}
