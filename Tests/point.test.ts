import { describe, expect } from '@jest/globals';
import * as SUT from '../Logic/PointsCounting/Point';

describe('Point', () => {
    it.each([
        [SUT.Point.ZERO, SUT.Point.FIFTEEN],
        [SUT.Point.FIFTEEN, SUT.Point.THIRTY],
        [SUT.Point.THIRTY, SUT.Point.FORTY],
        [SUT.Point.FORTY, SUT.Point.AD],
        [SUT.Point.AD, SUT.Point.WON]])
        ("Expects %p as %p's next point", (point : SUT.Point, nextPoint : SUT.Point) => {
            expect(SUT.Point.addPoint(point) === nextPoint);
        });
})