import {
    ApolloClient,
    createHttpLink,
    gql,
    InMemoryCache,
} from "@apollo/client";

const createApolloClient = () => {
    return new ApolloClient({
        link: createHttpLink({
            uri: "https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-svg",
        }),
        cache: new InMemoryCache(),
    });
};
const apolloClient = createApolloClient();

const GET_AAVEGOTCHI_SVGs = gql`
    query svg_gotchi_aavegotchi($id: String!) {
        aavegotchi(id: $id) {
            id
            svg
            left
            right
            back
        }
    }
`;

export default async function handler(req, res) {
    const gotchiId = "4430";

    try {
        const { data } = await apolloClient.query({
            query: GET_AAVEGOTCHI_SVGs,
            variables: { id: gotchiId },
        });

        res.setHeader("Content-Type", "application/json")
            .setHeader("Cache-Control", "s-maxage=3600, public")
            .status(200)
            .json({ data });
    } catch (e) {
        res.setHeader("Content-Type", "application/json")
            .status(400)
            .json({ error: e });
    }
}
